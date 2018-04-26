import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListWindowComponent } from './components/list-window/list-window.component';

const routes: Routes = [
{path: 'list', component: ListWindowComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
