import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { EstudianteService } from '../../estudiante.service';
import { takeUntil } from 'rxjs';
import { Empresa } from '../../../../auth/interfaces/empresa.interface';
import { SolicitudCartaVacante } from '../../../../auth/interfaces/documentos/solicitudCartaVacante';
import Swal from 'sweetalert2';
import { UsuarioLog } from 'src/app/auth/interfaces/usuarioLog.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { AdministradorService } from '../../../administrador/services/administrador.service';

@Component({
  selector: 'app-solicitar-carta-vacante',
  templateUrl: './solicitar-carta-vacante.component.html',
  styleUrls: ['./solicitar-carta-vacante.component.css']
})
export class SolicitarCartaVacanteComponent implements OnInit, OnDestroy {

  anio: number = new Date().getFullYear();
  private _unsubscribeAll: Subject<any>;
  usuarioLogeado!: UsuarioLog;
  empresas!: Empresa[];
  proyectos!: any[];
  datos!: any[];
  disableSelect = new FormControl(false);
  filtrados!: any[];
  porEmpresa!: any[];
  id_estudiante!: number;

  solicitarCartaForm: FormGroup = this.fb.group({
    empresa: [, [Validators.required]],
    nombreProyecto: [, [Validators.required]],
    periodoRealizar: ['', [Validators.required]],
    anioRealizar: [this.anio, [Validators.required]],
    ciudadRealizar: ['', [Validators.required]]
  })

  periodos = [
    {id: 1, periodo: 'Primer Semestre'},
    {id: 2, periodo: 'Segundo Semestre'},
    {id: 3, periodo: 'Verano'},
  ]

  ciudades = ['Antofagasta', 'Coquimbo', 'Calama','Mejillones']

  constructor(
    private estudianteS: EstudianteService,
    private authS: AuthService,
    private adminS: AdministradorService,
    private fb : FormBuilder,
  ) { 
    this._unsubscribeAll = new Subject();
    this.usuarioLogeado = this.authS.usuario;
    this.adminS.obtenerEstudiantePorIdUsuario(this.usuarioLogeado.id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante)=>{
          // console.log(estudiante)
          this.id_estudiante = estudiante.id_estudiante;
        })

        // IMPLEMENTAR ALERTA CUANDO NO TIENE ID DE ESTUDIANTE.
  }

  get f(){
    return this.solicitarCartaForm.controls;
  }

  onlyUnique(value:any, index:any, self:any):boolean {
    return self.indexOf(value) === index;
  }

  ngOnInit(): void {
    this.estudianteS.getEmpresasSolicitadoEstudiante()
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((data: any)=>{
        // // console.log(data); 
        this.datos = [... data];
        // const filtrados = data.filter((v:any)=> this.datos.filter((d)=> d.id_empresa !== v.id_empresa ).length === 0  );
        // const filtrados = this.datos.filter(onlyUnique)
        // // console.log(filtrados);
        
        // const filtrados = this.datos.filter((v,i,a) => a.indexOf(v) === i );

        // const unique = [...new Set(this.datos.map(item => item.id_empresa))];

        this.filtrados = [...new Map(this.datos.map(item =>
          [item['id_empresa'], item])).values()];

        // // console.log(unique)

      })

      this.solicitarCartaForm.valueChanges.pipe(takeUntil(this._unsubscribeAll))
        .subscribe(({empresa, ...rest})=>{
          // // console.log('empresa', empresa)
          this.porEmpresa = this.datos.filter(item=> item.id_empresa === empresa )
          // // console.log(x)
          // if(empresa.id_empresa === this.datos.forEach()){

          // }
        })
  }

  ngOnDestroy(): void {
    
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  enviar(): void {
    // // console.log(this.solicitarCartaForm.value);


    const solicitudCartaVacante: SolicitudCartaVacante = this.solicitarCartaForm.value;
    // solicitudCartaVacante.id_empresa = this.solicitarCartaForm.value.empresa;
    solicitudCartaVacante.id_solicitudEstudiante = this.solicitarCartaForm.value.nombreProyecto;
    solicitudCartaVacante.id_estudiante=this.id_estudiante;
    this.estudianteS.crearSolicitudVacante(solicitudCartaVacante)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((resp:any)=>{
        // // console.log(resp);
        if(resp.ok){
          Swal.fire('Se ha registrado la solicitud de carta para vacante.','','success');
        }else{
          Swal.fire('Ha ocurrido un error',resp.msg,'error');
        }
      })

  }

}
