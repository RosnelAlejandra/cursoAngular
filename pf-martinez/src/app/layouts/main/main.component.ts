import { Component } from '@angular/core';
import { StudentsComponent } from './views/students/students.component';
import { SectionList } from './models/menu.models';
import { menuGeneral, menuStudents } from './mocks/data';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;

  menu1: SectionList[] = menuStudents;
  menu2: SectionList[] = menuGeneral;
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  currentRoute: string = '';

  constructor( private router: Router, private route: ActivatedRoute){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Ruta actual:', this.currentRoute);
      }
    });
  }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: '../../../assets/images/u1.jpeg',
      title: 'Sede Ricon Blanco',
      subtitle: 'Con las mejores instalaciones'
    };
    this.slides[1] = {
      id: 1,
      src: '../../../assets/images/u2.jpeg',
      title: 'Se los Nuevos Egresados',
      subtitle: 'Certificado por ATING'
    }
    this.slides[2] = {
      id: 2,
      src: '../../../assets/images/u3.jpeg',
      title: 'Desplega tu Talento',
      subtitle: 'Arte, Música, Diseño'
    }
  }

  closeSesion() { 
    this.router.navigate(['auth','login']);
    //this.router.navigate([ ['ruta'], { reletive: this.route }]);
  }
}
