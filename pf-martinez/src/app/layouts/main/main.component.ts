import { Component } from '@angular/core';
import { SectionListNav } from './models/menu.models';
import { menuGeneral, menuStudents } from './mocks/data';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
/* import { UsersModel } from './views/users/models/models'; */
import { Store } from '@ngrx/store';
import { selectProfile, selectRolProfile } from '../../core/store/profile/selectors';
import { ProfileState } from '../../core/store/profile/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;

  
  menu1: SectionListNav[] = menuStudents;
  menu2: SectionListNav[] = [];
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  currentRoute: string = '';
/*   user: UsersModel | null = null; */

  profile$: Observable<ProfileState | null>;

  constructor( private router: Router, 
              private store: Store,
              private authService: AuthService){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.profile$ = this.store.select(selectProfile) 

    this.store.select(selectRolProfile).subscribe({
      next: (rol) => {
        console.log('rol', rol)
        if(rol == 'ADMIN') {
          this.menu2 = menuGeneral
        }else{
          this.menu2 = menuGeneral.filter( (m) => m.path != '/users')
        }
      }
    });

/*     this.authService.getUserLogged().subscribe({
      next: (u) => {
        this.user = u; 
         
        console.log('user logged in', u);
        if(u?.role == 'ADMIN') {
          this.menu2 = menuGeneral
        }else{
          this.menu2 = menuGeneral.filter( (m) => m.path != '/users')
        }
      }
    })
 */
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
