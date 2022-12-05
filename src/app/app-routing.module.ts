import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./covid/components/about/about.component";
import { ContentComponent } from "./covid/components/content/content.component";
import { TipsComponent } from "./covid/components/tips/tips.component";

const routes: Routes = [
    {path: '', component : ContentComponent},
    {path: 'about', component: AboutComponent},
    {path: 'tips', component: TipsComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{

}