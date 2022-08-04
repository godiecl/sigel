import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/services/auth.service';
import { ComisionCorreccionPracticaService } from '../../comision-correccion-practica.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-editar-evaluar-defensa',
  templateUrl: './editar-evaluar-defensa.component.html',
  styleUrls: ['./editar-evaluar-defensa.component.css']
})
export class EditarEvaluarDefensaComponent implements OnInit {

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
  evaluaciones!: any[];
  profesor: any;
  id_cc: any;
  secretario: boolean = false;
  private _unsubscribeAll: Subject<any>;
  calidad!: number;
  contenido!: number;
  dominio!: number;
  claridad!: number;
  tiempo!: number;
  defensa!: number;
  observaciones!: string;

  estudiante!: any;

  evaluarDefensaForm!: FormGroup;
  mostrarFormulario: boolean = false;
  evaluacionSelectForm: FormGroup = this.fb.group({
    evaluacion: [, [Validators.required]]
  })
  usuariolog!: any;
  constructor(
    private fb: FormBuilder,
    private authSv: AuthService,
    private ccSv: ComisionCorreccionPracticaService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.usuariolog = this.authSv.usuario;
    console.log('hola', this.usuariolog)
    this.ccSv.getEstudiantesEditarEvaluacionDefensa(this.usuariolog.id).subscribe((resp) => {
      // console.log('datos: ',datos)
      if (resp.ok) {

        console.log('datos: ', resp)

        this.evaluaciones = resp.datos;
        console.log('evaluaciones: ', this.evaluaciones)


        this.evaluacionSelectForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ evaluacion, ...rest }) => {
          if (evaluacion) {
            console.log(evaluacion)
            let evaluacionSelec = this.evaluaciones.find((obj) => {
              return obj.id_evaluacionDefensa === evaluacion;
            })
            this.calidad = evaluacionSelec.calidadMaterialEvaluador;
            this.tiempo = evaluacionSelec.tiempoEvaluador;
            this.claridad = evaluacionSelec.claridadEvaluador;
            this.contenido = evaluacionSelec.contenidoEvaluador;
            this.defensa = evaluacionSelec.defensaEvaluador;
            this.dominio = evaluacionSelec.dominioEscenicoEvaluador;
            this.observaciones = evaluacionSelec.observacionesEvaluador;
            this.fortalezasMostrar = evaluacionSelec.fortalezasEmpresa
            this.debilidadesMostrar = evaluacionSelec.debilidadesEmpresa

            this.evaluarDefensaForm = this.fb.group({
              calidadMaterialEvaluador: [this.calidad, [Validators.required]],
              contenidoEvaluador: [this.contenido, [Validators.required]],
              dominioEscenicoEvaluador: [this.dominio, [Validators.required]],
              claridadEvaluador: [this.claridad, [Validators.required]],
              tiempoEvaluador: [this.tiempo, [Validators.required]],
              defensaEvaluador: [this.defensa, [Validators.required]],
              observacionesEvaluador: [this.observaciones, []],
              // calidadMaterialEvaluador2: [, [Validators.required]],
              // contenidoEvaluador2: [, [Validators.required]],
              // dominioEscenicoEvaluador2: [, [Validators.required]],
              // claridadEvaluador2: [, [Validators.required]],
              // tiempoEvaluador2: [, [Validators.required]],
              // defensaEvaluador2: [, [Validators.required]],
              // observacionesEvaluador2: [, []],
            })
            this.mostrarFormulario = true;
          }

        });

      } else {
        console.log(resp)
        Swal.fire('Ha ocurrido un error', resp.msg, 'error');
        // this.router.navigate(['../'], {relativeTo: this._activatedRoute});
      }
    })

    this.ccSv.refresh$.subscribe((resp) => {
      this.ccSv.getEstudiantesEditarEvaluacionDefensa(this.usuariolog.id).subscribe((resp) => {
        // console.log('datos: ',datos)
        if (resp.ok) {

          console.log('datos: ', resp)

          this.evaluaciones = resp.datos;
          console.log('evaluaciones: ', this.evaluaciones)


          this.evaluacionSelectForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ evaluacion, ...rest }) => {
            if (evaluacion) {
              console.log(evaluacion)
              let evaluacionSelec = this.evaluaciones.find((obj) => {
                return obj.id_evaluacionDefensa === evaluacion;
              })
              this.calidad = evaluacionSelec.calidadMaterialEvaluador;
              this.tiempo = evaluacionSelec.tiempoEvaluador;
              this.claridad = evaluacionSelec.claridadEvaluador;
              this.contenido = evaluacionSelec.contenidoEvaluador;
              this.defensa = evaluacionSelec.defensaEvaluador;
              this.dominio = evaluacionSelec.dominioEscenicoEvaluador;
              this.observaciones = evaluacionSelec.observacionesEvaluador;
              this.fortalezasMostrar = evaluacionSelec.fortalezasEmpresa
              this.debilidadesMostrar = evaluacionSelec.debilidadesEmpresa

              this.evaluarDefensaForm = this.fb.group({
                calidadMaterialEvaluador: [this.calidad, [Validators.required]],
                contenidoEvaluador: [this.contenido, [Validators.required]],
                dominioEscenicoEvaluador: [this.dominio, [Validators.required]],
                claridadEvaluador: [this.claridad, [Validators.required]],
                tiempoEvaluador: [this.tiempo, [Validators.required]],
                defensaEvaluador: [this.defensa, [Validators.required]],
                observacionesEvaluador: [this.observaciones, []],
              })
              this.mostrarFormulario = true;
            }

          });

        } else {
          console.log(resp)
          Swal.fire('Ha ocurrido un error', resp.msg, 'error');
          // this.router.navigate(['../'], {relativeTo: this._activatedRoute});
        }
      })
    })

  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  alerta() {

    let data: any = this.evaluarDefensaForm.getRawValue()
    const promedio = ((data.calidadMaterialEvaluador * 0.15) + (data.contenidoEvaluador * 0.20) +
      (data.dominioEscenicoEvaluador * 0.15) + (data.claridadEvaluador * 0.20) + (data.tiempoEvaluador * 0.10) + (data.defensaEvaluador * 0.20))
    console.log(promedio)
    data.promedioEvaluador = Math.round(promedio * 1e2) / 1e2;
    data.id_evaluacionDefensa = this.evaluacionSelectForm.value.evaluacion;
    // data.id_comisionCorreccion = this.id_cc;
    // data.secretario = this.secretario;
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

  enviar(data: any) {

    this.ccSv.editarEvaluacionDefensa(data, this.usuariolog.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
      if (resp.ok) {
        let evaluacionEditada: any = this.evaluaciones.find((evaluacion) => {
         return evaluacion.id_evaluacionDefensa === data.id_evaluacionDefensa
        })
        evaluacionEditada.calidadMaterialEvaluador = data.calidadMaterialEvaluador
        evaluacionEditada.tiempoEvaluador = data.tiempoEvaluador
        evaluacionEditada.claridadEvaluador = data.claridadEvaluador
        evaluacionEditada.contenidoEvaluador = data.contenidoEvaluador
        evaluacionEditada.defensaEvaluador = data.defensaEvaluador
        evaluacionEditada.dominioEscenicoEvaluador = data.dominioEscenicoEvaluador
        evaluacionEditada.observacionesEvaluador = data.observacionesEvaluador
        this.cdr.detectChanges()
        Swal.fire(resp.msg, '', 'success');
      } else {
        Swal.fire('Ha ocurrido un error', resp.msg, 'error');
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
