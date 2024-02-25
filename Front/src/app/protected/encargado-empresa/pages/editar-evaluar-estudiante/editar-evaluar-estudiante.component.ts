
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-editar-evaluar-estudiante',
  templateUrl: './editar-evaluar-estudiante.component.html',
  styleUrls: ['./editar-evaluar-estudiante.component.css']
})
export class EditarEvaluarEstudianteComponent implements OnInit {

  
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

  
  evaluaciones!: any[];
  mostrarFormulario: boolean = false;
  evaluacionSelectForm: FormGroup = this.fb.group({
    evaluacion: [, [Validators.required]]
  })
  evaluarTrabajoForm!: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private adminS: AdministradorService,
    private router: Router,
    private encEmpS: EncargadoEmpresaService,
    private encargadoS: EncargadoTitulacionPracticaService,
    private cdr: ChangeDetectorRef,
    ) {
      this._unsubscribeAll = new Subject();
     }

  ngOnInit(): void {
      this.usuarioLogeado = this.authS.usuario;
          this.encEmpS.getEstudiantesEditarEvaluacionEmpresa(this.usuarioLogeado.id) .subscribe((resp: any)=>{
            console.log(resp.datos)
            if(resp.ok){  
            // this.datos = [... resp.datos];
            this.evaluaciones = resp.datos
            this.evaluacionSelectForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ evaluacion, ...rest }) => {
              if (evaluacion) {
                console.log(evaluacion)
                let evaluacionSelec = this.evaluaciones.find((obj) => {
                  return obj.id_evaluacionEmpresa === evaluacion;
                })
                
  
                this.evaluarTrabajoForm = this.fb.group({
                  asistenciaPuntualidad: [evaluacionSelec.asistenciaPuntualidad , [Validators.required]],
                  conducta: [evaluacionSelec.conducta , [Validators.required]],
                  dedicacion: [evaluacionSelec.dedicacion, [Validators.required]],
                  habilidadAprender: [evaluacionSelec.habilidadAprender, [Validators.required]],
                  adaptacion: [evaluacionSelec.adaptacion, [Validators.required]],
                  iniciativa: [evaluacionSelec.iniciativa, [Validators.required]],
                  aporteEmpresa: [evaluacionSelec.aporteEmpresa, [Validators.required]],
                  conocimientos: [evaluacionSelec.conocimientos, [Validators.required]],
                  criterio: [evaluacionSelec.criterio, [Validators.required]],
                  fortalezas: [evaluacionSelec.fortalezas, [Validators.required]],
                  debilidades: [evaluacionSelec.debilidades, [Validators.required]],
                  
                })
                this.mostrarFormulario = true;
              }
  
            });
            // [...new Map(this.datos.map(item =>
            // [item['id_estudiante'], item])).values()];
            }else{
              Swal.fire('Ha ocurrido un error', resp.msg, 'error')
            }
          })
      this.encEmpS.Refreshrequider.subscribe((resp)=>{
        this.encEmpS.getEstudiantesEditarEvaluacionEmpresa(this.usuarioLogeado.id).subscribe((res)=>{
          
          this.evaluaciones = res.datos
        })
      })
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
    data.id_evaluacionEmpresa = this.evaluacionSelectForm.value.evaluacion;

    Swal.fire({
      title: `¿Está seguro de los datos ingresados?. <br> El promedio del estudiante sería: ${data.notaFinal}. <br> <br> Click en sí para enviar la evaluación.`,
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
    this.encEmpS.editarEvaluacionEmpresa(this.usuarioLogeado.id,data).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((resp:any)=>{
      if(resp.ok){
        let evaluacionEditada = this.evaluaciones.find((obj) => {
          return obj.id_evaluacionEmpresa === data.id_evaluacionEmpresa;
        })
        evaluacionEditada.asistenciaPuntualidad  = data.asistenciaPuntualidad
        evaluacionEditada.conducta  = data.conducta
        evaluacionEditada.dedicacion = data.dedicacion
        evaluacionEditada.habilidadAprender = data.habilidadAprender
        evaluacionEditada.adaptacion = data.adaptacion
        evaluacionEditada.iniciativa = data.iniciativa
        evaluacionEditada.aporteEmpresa = data.aporteEmpresa
        evaluacionEditada.conocimientos = data.conocimientos
        evaluacionEditada.criterio = data.criterio
        evaluacionEditada.fortalezas = data.fortalezas
        evaluacionEditada.debilidades = data.debilidades
        this.cdr.detectChanges();
        Swal.fire(resp.msg,'','success');
      }
      else if(resp.ok === false){
        Swal.fire('Ha ocurrido un error',resp.msg,'error');
      }
    })

  }
}
