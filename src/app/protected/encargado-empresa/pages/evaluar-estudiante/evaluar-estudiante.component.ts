import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Empresa } from 'src/app/auth/interfaces/empresa.interface';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { UsuarioLog } from 'src/app/auth/interfaces/usuarioLog.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdministradorService } from 'src/app/protected/administrador/services/administrador.service';
import { EncargadoTitulacionPracticaService } from 'src/app/protected/encargado-practica-titulacion/encargado-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { EncargadoEmpresaService } from '../../encargado-empresa.service';

@Component({
  selector: 'app-evaluar-estudiante',
  templateUrl: './evaluar-estudiante.component.html',
  styleUrls: ['./evaluar-estudiante.component.css']
})
export class EvaluarEstudianteComponent implements OnInit, OnDestroy {

  // estudiantes = ['Walter', 'Franz']
  
  private _unsubscribeAll: Subject<any>;
  encargadoEmpresaLog!: EncargadoEmpresa;
  usuarioLogeado!: UsuarioLog;
  empresaLog!: Empresa;
  datos!: any[];
  estudiantes!: any[];

  displayedColumns: string[] = [
  'sobresaliente',
  'muybueno',
  'bueno',
  'regular',
  'insatisfactorio',
];
  dataSource = [{ 
  sobresaliente: 'Nota 7.0 - 6.1', 
  muybueno: 'Nota 6.0 - 5.1', 
  bueno: 'Nota 5.0 - 4.1', 
  regular: 'Nota 4.0 - 3.1', 
  insatisfactorio: 'Nota 3.0 - 1.0'
  }]

  evaluarTrabajoForm: FormGroup = this.fb.group({
    estudiante: [, [Validators.required]],
    asistenciaPuntualidad: [, [Validators.required]],
    conducta: [, [Validators.required]],
    dedicacion: [, [Validators.required]],
    habilidadAprender: [, [Validators.required]],
    adaptacion: [, [Validators.required]],
    iniciativa: [, [Validators.required]],
    aporteEmpresa: [, [Validators.required]],
    conocimientos: [, [Validators.required]],
    criterio: [, [Validators.required]],
    fortalezas: [, [Validators.required]],
    debilidades: [, [Validators.required]],
    
  })

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private adminS: AdministradorService,
    private router: Router,
    private encEmpS: EncargadoEmpresaService,
    private encargadoS: EncargadoTitulacionPracticaService
    ) {
      this._unsubscribeAll = new Subject();
      this.usuarioLogeado = this.authS.usuario;
      this.adminS.obtenerEncargadoEmpresaPorIdUsuario(this.usuarioLogeado.id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((encargado: EncargadoEmpresa)=>{
          this.encargadoEmpresaLog = encargado;
          // console.log(this.encargadoEmpresaLog)
          this.encEmpS.getEstudiantesAsociados(encargado.id_encargadoEmpresa).subscribe((datos: any)=>{
            console.log(datos)
            this.datos = [... datos.datos];
            this.estudiantes = [...new Map(this.datos.map(item =>
              [item['id_estudiante'], item])).values()];
          })

        })
        

     }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  alertaSeguro(): void{
    
    const data:any = this.evaluarTrabajoForm.getRawValue()
    const notaFinal = ((data.asistenciaPuntualidad + data.conducta + data.dedicacion + data.habilidadAprender + data.adaptacion + data.iniciativa + data.aporteEmpresa + data.conocimientos + data.criterio) / 9)
    data.notaFinal = notaFinal.toFixed(1)
    console.log(notaFinal)
    data.id_encargadoEmpresa = this.encargadoEmpresaLog.id_encargadoEmpresa;

    Swal.fire({
      title: `¿Está seguro de los datos ingresados?. <br> El promedio del estudiante sería: ${data.notaFinal}. <br> Esta evaluación no se puede cambiar. <br> Click en sí para enviar la evaluación.`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sí, estoy seguro',
      denyButtonText: `No`,
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.enviar(data)
        // Swal.fire('', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  enviar(data: any){

    
    // data.id_estudiante = id;
    this.encEmpS.crearEvaluacionEmpresa(data).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire('Se ha evaluado exitósamente al estudiante','','success');
      }
      else if(resp.ok === false){
        Swal.fire('Ha ocurrido un error',resp.msg,'error');
      }
    })

  }
}
