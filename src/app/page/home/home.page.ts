import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userHome1: any;
  pass: any;
  value = "Benja";
  idalumno : any;

  cursos: any[] = [];

  constructor(private activeroute: ActivatedRoute, private router: Router, private apiService : ConsumoAPIService) { this.activeroute.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.userHome1 = this.router.getCurrentNavigation()?.extras.state?.['user'];
      this.idalumno = this.router.getCurrentNavigation()?.extras.state?.['id'];
    }
  });}

  verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idalumno: this.idalumno,
        cursoId : cursoId
      }
    };
    this.router.navigate(['/detallecurso'],setData);
}


  ngOnInit() {
    this.apiService.obtenerCursosPorProfesor(this.idalumno).subscribe(data => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }
}


