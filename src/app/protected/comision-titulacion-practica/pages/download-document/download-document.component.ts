import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css']
})
export class DownloadDocumentComponent implements OnInit {
  public previsualizacionPracticaEstudiante!: string;
  public previsualizacionCasptoneEstudiante!: string;
  public previsualizacionPracticaProfesor!: string;
  public previsualizacionCasptoneProfesor!: string;
  public archivosPracticaEstudiante:any=[]
  public archivosCapstoneEstudiante:any=[]
  public archivosPracticaProfesor:any=[]
  public archivosCapstoneProfesor:any=[]



  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  capturarFilePracticaEstudiante(event:any) {
    const archivoCapturado=event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacionPracticaEstudiante= imagen.base;
    })
    this.archivosPracticaEstudiante.push(archivoCapturado)
  }

  capturarFileCapstoneEstudiante(event:any) {
    const archivoCapturado=event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacionCasptoneEstudiante= imagen.base;
    })
    this.archivosCapstoneEstudiante.push(archivoCapturado)
  }
  capturarFilePracticaProfesor(event:any) {
    const archivoCapturado=event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacionPracticaProfesor= imagen.base;
    })
    this.archivosPracticaProfesor.push(archivoCapturado)
  }

  capturarFileCapstoneProfesor(event:any) {
    const archivoCapturado=event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacionCasptoneProfesor= imagen.base;
    })
    this.archivosCapstoneProfesor.push(archivoCapturado)
  }


  extraerBase64 = async ($event:any)=> new Promise ((resolve, reject) =>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base:reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base:null
        });
      };
    }catch(e){
      return $event;
    }
  })
}
