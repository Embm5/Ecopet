import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { loginGuard, rolAdmin, rolDuenio, rolVeterinario } from './guards/login.guard';
import { FormularioMascotaComponent } from './components/formulario-mascota/formulario-mascota.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { FormularioPersonaComponent } from './components/formulario-persona/formulario-persona.component';
import { HistorialVacunaComponent } from './pages/historial-vacuna/historial-vacuna.component';
import { HistoriaClinicaService } from './services/historia-clinica.service';
import { FormularioHistorialClinicoComponent } from './components/formulario-historial-clinico/formulario-historial-clinico.component';
import { GuiaUsuarioComponent } from './pages/guia-usuario/guia-usuario.component';
// import { MisMascotasComponent } from './pages/mis-mascotas/mis-mascotas.component';

export const routes: Routes = [{
    title: 'Home',
    path: '',
    component: HomeComponent
}, {
    title: 'About Us',
    path: 'about',
    component: AboutUsComponent
}, {
    title: 'Guia Usuario',
    path: 'guia',
    component: GuiaUsuarioComponent
}, {
    title: 'Login',
    path: 'login',
    component: LoginComponent
}, {
    title: 'Mascota',
    path: 'mascota',
    component: MascotaComponent,
    canActivate: [loginGuard]
}, {
    title: 'FormularioAgregar',
    path: 'mascota/formulario',
    component: FormularioMascotaComponent,
    canActivate: [loginGuard]
}, {
    title: 'FormularioEditarMascota',
    path: 'mascota/formulario/:id',
    component: FormularioMascotaComponent,
    canActivate: [loginGuard]
}, {
    title: 'Persona',
    path: 'persona',
    component: PersonaComponent,
    canActivate: [loginGuard, rolAdmin]
}, {
    title: 'Formulario',
    path: 'persona/formulario',
    component: FormularioPersonaComponent,
    canActivate: [loginGuard, rolAdmin]
}, {
    title: 'FormularioEditarPersona',
    path: 'persona/formulario/:id',
    component: FormularioPersonaComponent,
    canActivate: [loginGuard, rolVeterinario]
}, {
    title: 'Historial De Vacuna',
    path: 'mascota/historialVacuna/:id',
    component: HistorialVacunaComponent,
    canActivate: [loginGuard, rolVeterinario]
}, {
    title: 'Formulario Historial clinico',
    path: 'mascota/historialClinico/formulario/:id',
    component: FormularioHistorialClinicoComponent,
    canActivate: [loginGuard, rolVeterinario]
}];