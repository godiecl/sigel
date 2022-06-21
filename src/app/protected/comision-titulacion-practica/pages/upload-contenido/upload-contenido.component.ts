import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-contenido',
  templateUrl: './upload-contenido.component.html',
  styleUrls: ['./upload-contenido.component.css']
})
export class UploadContenidoComponent implements OnInit {
  public previsualizacion!: string;
  public archivos:any=[]

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  capturarFilePractica(event:any) {
    const archivoCapturado=event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion= imagen.base;
    })
    this.archivos.push(archivoCapturado)
  }

  //previsualizar archivo
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
