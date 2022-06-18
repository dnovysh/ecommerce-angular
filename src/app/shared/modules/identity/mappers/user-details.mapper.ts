import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { UserDetailsDtoInterface } from "src/app/shared/modules/identity/types/user-details-dto.interface";
import { Injectable } from "@angular/core";

@Injectable()
export class UserDetailsMapper {
  mapFromUserDetailsDtoOrNull(input: UserDetailsDtoInterface | null): UserDetailsInterface | null {
    if (input === null) {
      return null
    }
    return this.mapFromUserDetailsDto(input)
  }

  mapFromUserDetailsDto(input: UserDetailsDtoInterface): UserDetailsInterface {
    return new class implements UserDetailsInterface {
      id = input.id;
      username = input.username;
      accountNonExpired = input.accountNonExpired;
      accountNonLocked = input.accountNonLocked;
      credentialsNonExpired = input.credentialsNonExpired;
      enabled = input.enabled;
      dealerRepresentative = input.dealerRepresentative;
      dealer = input.dealer;
      userAlias = input.userAlias;
      roles = input.roles ? new Set<string>(input.roles) : new Set<string>();
      authorities = input.authorities ? new Set<string>(input.authorities) : new Set<string>();
    }
  }
}
