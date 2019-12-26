import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';

const opcionesRoutes: Routes = [
    { path: 'historial', component: HistorialComponent }
];

export const OPCIONES_ROUTES = RouterModule.forChild( opcionesRoutes );
