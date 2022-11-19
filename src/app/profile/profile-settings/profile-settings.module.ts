import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from "src/app/profile/profile-settings/profile-settings.component";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth-guard.class";


@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  providers: [
    AuthGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ProfileSettingsModule {}
