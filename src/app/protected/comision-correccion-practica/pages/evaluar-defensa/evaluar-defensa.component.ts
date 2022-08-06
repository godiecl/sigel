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

  // estudiantes: any[] = [{id_estudiante: 1, nombre: 'Walter'}]
  estudiantes!: any[];
  profesor: any;
  id_cc: any;
  secretario: boolean = false;
  private _unsubscribeAll: Subject<any>;
  periodos = [
    {id: 1, periodo: 'Primer Semestre'},
    {id: 2, periodo: 'Segundo Semestre'},
    {id: 3, periodo: 'Verano'},
  ]

  periodosExamen = [
    {id: 1, periodo: 'Principio primer semestre'},
    {id: 2, periodo: 'Final primer semestre'},
    {id: 3, periodo: 'Final segundo semestre'},
  ]

  evaluarDefensaForm: FormGroup = this.fb.group({
    estudiante: [,[Validators.required]],
    periodoRealizar: [, [Validators.required]],
    anioRealizar: [, [Validators.required]],
    periodoExamen: [, [Validators.required]],
    anioExamen: [, [Validators.required]],
    calidadMaterialEvaluador: [, [Validators.required]],
    contenidoEvaluador: [, [Validators.required]],
    dominioEscenicoEvaluador: [, [Validators.required]],
    claridadEvaluador: [, [Validators.required]],
    tiempoEvaluador: [, [Validators.required]],
    defensaEvaluador: [, [Validators.required]],
    observacionesEvaluador: [, []],
    // calidadMaterialEvaluador2: [, [Validators.required]],
    // contenidoEvaluador2: [, [Validators.required]],
    // dominioEscenicoEvaluador2: [, [Validators.required]],
    // claridadEvaluador2: [, [Validators.required]],
    // tiempoEvaluador2: [, [Validators.required]],
    // defensaEvaluador2: [, [Validators.required]],
    // observacionesEvaluador2: [, []],
  })


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
        this.profesor = resp.datos[0].profesor;
        this.id_cc = resp.datos[0].idCC;
        this.secretario = resp.datos[0].secretario;
        

      }else{
        console.log(resp)
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

    const data:any = this.evaluarDefensaForm.getRawValue()
    const promedio = ((data.calidadMaterialEvaluador * 0.15) + (data.contenidoEvaluador * 0.20) +
    (data.dominioEscenicoEvaluador * 0.15) + (data.claridadEvaluador * 0.20) + (data.tiempoEvaluador * 0.10) + (data.defensaEvaluador * 0.20))
    console.log(promedio)
    data.promedioEvaluador = Math.round( promedio * 1e2 ) / 1e2;
    data.id_comisionCorreccion = this.id_cc;
    data.secretario = this.secretario;
    console.log(data)

    Swal.fire({
      title: `¿Está seguro de los datos ingresados?. <br> El promedio de la defensa del estudiante sería: ${data.promedioEvaluador} <br>  <br> Click en sí para enviar la evaluación.`,
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

    this.ccSv.actualizarEvaluacionDefensa(data).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
      if(resp.ok){
        Swal.fire(resp.msg,'','success');
      }else{
        Swal.fire('Ha ocurrido un error',resp.msg,'error');
      }
    })
    
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
