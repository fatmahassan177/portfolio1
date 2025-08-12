import { Routes } from '@angular/router';
import { Introduction } from './introduction/introduction';
import { Layout } from './layout/layout';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Project } from './project/project';
import { ContactUs } from './contact-us/contact-us';
import { Dashboard } from './dashboard/dashboard';
import { DIntro } from './dashboard/dintro/dintro';
import { DSkills } from './dashboard/dskills/dskills';
import { DContact } from './dashboard/dcontact/dcontact';

import { DAbout } from './dashboard/dabout/dabout';
import { Notfound } from './notfound/notfound';
import { Dproject} from './dashboard/dproject/dproject';

export const routes: Routes = [
    {path:'',component:Layout,children:[
    {path:'',redirectTo:'introduction',pathMatch:'full'},
    {path:'introduction',component:Introduction},
    {path:'About',component:About},
    {path:'Skills',component:Skills},
    {path:'Project', component:Project},
    {path:'ContactUs',component:ContactUs}
    
    ]},
  
    {path:'dashboard',component:Dashboard,children:[
        {path:'dashboard/Dintro',component:DIntro},
        {path:'dashboard/Dskill',component:DSkills},
        {path:'dashboard/Dcontact',component:DContact},
        {path:'dashboard/Dproject',component:Dproject},
        {path:'dashboard/Dabout',component:DAbout},
        
    ]},
   {path:'**',component:Notfound},

];
