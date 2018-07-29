import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SeekProvinceModule } from './province/province.module';
import { SeekCityModule } from './city/city.module';
import { SeekDistrictModule } from './district/district.module';
import { SeekAgentAreaModule } from './agent-area/agent-area.module';
import { SeekAgentProvinceModule } from './agent-province/agent-province.module';
import { SeekLocationModule } from './location/location.module';
import { SeekRestaurantTypeModule } from './restaurant-type/restaurant-type.module';
import { SeekMealTableModule } from './meal-table/meal-table.module';
import { SeekRestaurantModule } from './restaurant/restaurant.module';
import { SeekDishModule } from './dish/dish.module';
import { SeekCuisineModule } from './cuisine/cuisine.module';
import { SeekMealOrderItemModule } from './meal-order-item/meal-order-item.module';
import { SeekMealOrderModule } from './meal-order/meal-order.module';
import { SeekBonusModule } from './bonus/bonus.module';
import { SeekBonusPoolModule } from './bonus-pool/bonus-pool.module';
import { SeekSealedBonusModule } from './sealed-bonus/sealed-bonus.module';
import { SeekUserExtraModule } from './user-extra/user-extra.module';
import { SeekCustomerModule } from './customer/customer.module';
import { SeekBankAccountModule } from './bank-account/bank-account.module';
import { SeekRestauranteurModule } from './restauranteur/restauranteur.module';
import { SeekAgentAdminModule } from './agent-admin/agent-admin.module';
import { SeekAgentModule } from './agent/agent.module';
import { SeekImageModule } from './image/image.module';
import { SeekBankTransferModule } from './bank-transfer/bank-transfer.module';
import { SeekAdminModule } from './admin/admin.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SeekProvinceModule,
        SeekCityModule,
        SeekDistrictModule,
        SeekAgentAreaModule,
        SeekAgentProvinceModule,
        SeekLocationModule,
        SeekRestaurantTypeModule,
        SeekMealTableModule,
        SeekRestaurantModule,
        SeekDishModule,
        SeekCuisineModule,
        SeekMealOrderItemModule,
        SeekMealOrderModule,
        SeekBonusModule,
        SeekBonusPoolModule,
        SeekSealedBonusModule,
        SeekUserExtraModule,
        SeekCustomerModule,
        SeekBankAccountModule,
        SeekRestauranteurModule,
        SeekAgentAdminModule,
        SeekAgentModule,
        SeekImageModule,
        SeekBankTransferModule,
        SeekAdminModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeekEntityModule {}
