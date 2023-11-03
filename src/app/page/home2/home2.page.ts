import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-home2',
  templateUrl: 'home2.page.html',
  styleUrls: ['home2.page.scss'],
})
export class Home2Page implements OnInit {

  userHome2: any;
  pass: any;
  value = "dcaresg";
  idProfesor : any;

  cursos: any[] = [];

  constructor(private activeroute: ActivatedRoute, private router: Router, private apiService : ConsumoAPIService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome2 = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idProfesor = this.router.getCurrentNavigation()?.extras.state?.['id'];
      }
    });

  }

  verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idProfesor: this.idProfesor,
        cursoId : cursoId
      }
    };
    this.router.navigate(['/detallecurso'],setData);
}


  ngOnInit() {
    this.apiService.obtenerCursosPorProfesor(this.idProfesor).subscribe(data => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }
}
