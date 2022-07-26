import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/services/auth.service';
import { ComisionCorreccionPracticaService } from '../../comision-correccion-practica.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-evaluar-defensa',
  templateUrl: './evaluar-defensa.component.html',
  styleUrls: ['./evaluar-defensa.component.css']
})
export class EvaluarDefensaComponent implements OnInit, OnDestroy {

  // estudiantes: any[] = [{id_estudiante: 1, nombre: 'Walter'}]
  estudiantes!: any[];
  profesores!: any[];
  private _unsubscribeAll: Subject<any>;

  evaluarDefensaForm: FormGroup = this.fb.group({
    estudiante: [,[Validators.required]],
    calidadMaterialEvaluador1: [, [Validators.required]],
    contenidoEvaluador1: [, [Validators.required]],
    dominioEscenicoEvaluador1: [, [Validators.required]],
    claridadEvaluador1: [, [Validators.required]],
    tiempoEvaluador1: [, [Validators.required]],
    defensaEvaluador1: [, [Validators.required]],
    observacionesEvaluador1: [, [Validators.required]],
    calidadMaterialEvaluador2: [, [Validators.required]],
    contenidoEvaluador2: [, [Validators.required]],
    dominioEscenicoEvaluador2: [, [Validators.required]],
    claridadEvaluador2: [, [Validators.required]],
    tiempoEvaluador2: [, [Validators.required]],
    defensaEvaluador2: [, [Validators.required]],
    observacionesEvaluador2: [, [Validators.required]],
  })

  displayedCalidad: string[] = [
    'categoria',
    'excelente',
    'bueno',
    'regular',
    'insatisfactorio',
  ];
    dataCalidad = [{ 
    categoria: 'Calidad de material de apoyo (diapositivas) (15%)', 
     }]

    displayedDominio: string[] = [
      'categoria',
      'excelente',
      'bueno',
      'regular',
      'insatisfactorio',
    ];
    dataDominio = [{ 
      categoria: 'Dominio escénico (15%)', 
    }]

    dataClaridad = [{ 
      categoria: 'Claridad de exposición (20%)', 
    }]

    dataContenido = [{ 
      categoria: 'Contenido (20%)', 
    }]

    dataTiempo = [{ 
      categoria: 'Tiempo empleado (10%)', 
    }]

    dataDefensa = [{ 
      categoria: 'Defensa de la presentación (20%)', 
    }]

    fortalezasMostrar: string = 'Seleccione un estudiante para mostrar.'
    debilidadesMostrar: string = 'Seleccione un estudiante para mostrar';

  constructor(
    private fb: FormBuilder,
    private authSv: AuthService,
    private ccSv: ComisionCorreccionPracticaService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const usuariolog = this.authSv.usuario;
    console.log('hola',usuariolog)
    this.ccSv.getDatosAsociados(usuariolog.id).subscribe((resp)=>{
      // console.log('datos: ',datos)
      if(resp.ok){

        console.log('datos: ',resp)

        this.estudiantes = resp.datos[0].datosEstudiantes;
        console.log('estudiantes: ',this.estudiantes)
        this.profesores = resp.datos[0].datosProfesores;

        

      }else{
        Swal.fire('Ha ocurrido un error', resp.msg,'error');
        // this.router.navigate(['../'], {relativeTo: this._activatedRoute});
      }
    })

    this.evaluarDefensaForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe( ({ estudiante, ...rest}) => {
      console.log(estudiante)
      let estudianteSelec = this.estudiantes.find((obj)=>{
        return obj.id_estudiante === estudiante;
      })
      this.fortalezasMostrar = estudianteSelec.fortalezasEmpresa
      this.debilidadesMostrar = estudianteSelec.debilidadesEmpresa

    } );

  }

  ngOnDestroy(): void {
    
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
}

  alerta(){
    Swal.fire({
      title: '¿Está seguro de los datos ingresados?. <br> Esta evaluación no se puede cambiar. <br> Click en sí para enviar la evaluación.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sí, estoy seguro',
      denyButtonText: `No`,
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.enviar()
        // Swal.fire('', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  enviar(){

    const data:any = this.evaluarDefensaForm.getRawValue()
    console.log(data)
    // data.id_encargadoEmpresa = this.encargadoEmpresaLog.id_encargadoEmpresa;
    // data.id_estudiante = id;
    // this.encEmpS.crearEvaluacionEmpresa(data).pipe(takeUntil(this._unsubscribeAll))
    // .subscribe((resp:any)=>{
    //   if(resp.ok){
    //     Swal.fire('Se ha evaluado exitósamente al estudiante','','success');
    //   }
    //   else if(resp.ok === false){
    //     Swal.fire('Ha ocurrido un error',resp.msg,'error');
    //   }
    // })

  }

}
