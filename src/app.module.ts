import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { MenusModule } from './menus/menus.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { ReservationsModule } from './reservations/reservations.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { DeliveryAgentsModule } from './delivery-agents/delivery-agents.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { DeliveryZonesModule } from './delivery-zones/delivery-zones.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    EstablishmentsModule,
    MenusModule,
    CategoriesModule,
    ItemsModule,
    OrdersModule,
    ReservationsModule,
    DeliveriesModule,
    DeliveryAgentsModule,
    PaymentsModule,
    ReviewsModule,
    LoyaltyModule,
    NotificationsModule,
    AnalyticsModule,
    QrcodeModule,
    DeliveryZonesModule,
  ],
})
export class AppModule {}
