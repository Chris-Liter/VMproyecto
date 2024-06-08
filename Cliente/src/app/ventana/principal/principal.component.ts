import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autos } from 'src/app/menu/Autos';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  autos: Autos[] = [];
  auto: Autos = new Autos()
  autoForm: FormGroup
  codigos?: number;

  constructor(private autosService: AutoServicioService, private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

      this.autoForm = this.fb.group({
        marca: ['', Validators.required],
        color: ['', Validators.required],
        placa: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.loadAutos();
    const codigoParam = this.route.snapshot.paramMap.get('codigo');
    if (codigoParam !== null) {
      this.codigos = +codigoParam;
      if (this.codigos) {
        this.autosService.getAuto(this.codigos).subscribe((data: Autos) => {
          this.autoForm.patchValue(data);
        });
      }
    } else {
      this.codigos = 0; // O cualquier valor por defecto que consideres apropiado
    }
  }


  loadAutos(): void {
    this.autosService.getAutos().subscribe((data: Autos[]) => {
      this.autos = data;
    });
  }

  deleteAuto(codigo: number | undefined): void {
    this.autosService.deleteAuto(codigo).subscribe(data => {
      this.loadAutos();
      console.log(data)
    });
  }

  add(): void {
        this.autosService.addAuto(this.auto).subscribe(data => {
          console.log(data)
          location.reload()
        });
      }

  update(): void{
    this.autosService.updateAuto(this.auto).subscribe(data=> {
    console.log(data)
    location.reload()
  })}
    
  
  selected(numero : any){
    this.autosService.getAuto(numero).subscribe(data=>{
      console.log(data)
      this.auto = data
    })
  }




}
