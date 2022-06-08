import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from "src/app/profile/profile-settings/profile-settings.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'profile/settings', component: ProfileSettingsComponent }])
  ]
})
export class ProfileSettingsModule {}
