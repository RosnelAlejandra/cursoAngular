import { Component } from '@angular/core';
import { SectionList } from './models/menu.models';
import { menuGeneral, menuStudents } from './mocks/data';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsersModel } from './views/users/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;

  
  menu1: SectionList[] = menuStudents;
  menu2: SectionList[] = [];
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  currentRoute: string = '';
  user: UsersModel | null = null;
  constructor( private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Ruta actual:', this.currentRoute);
      }
    });

    this.authService.getUserLogged().subscribe({
      next: (u) => {
        this.user = u; console.log('user logged in', u);
        if(u?.role == 'ADMIN') {
          this.menu2 = menuGeneral
        }else{
          this.menu2 = menuGeneral.filter( (m) => m.path != '/users')
        }
      }
    })

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
    //this.router.navigate(['auth','login']);
    //this.router.navigate([ ['ruta'], { reletive: this.route }]);
    this.authService.logout();
  }
}
