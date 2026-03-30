import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding DELICE DELICE database...');

  await prisma.orderItemOption.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.order.deleteMany();
  await prisma.itemOption.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.deliveryZone.deleteMany();
  await prisma.referralCode.deleteMany();
  await prisma.loyaltyTransaction.deleteMany();
  await prisma.loyaltyCard.deleteMany();
  await prisma.deliveryAgent.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.client.deleteMany();
  await prisma.address.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.establishment.deleteMany();
  await prisma.user.deleteMany();

  const adminPwd = await bcrypt.hash('Admin@1234', 10);
  const clientPwd = await bcrypt.hash('Client@1234', 10);
  const restoPwd = await bcrypt.hash('Resto@1234', 10);
  const bakeryPwd = await bcrypt.hash('Bakery@1234', 10);
  const livreurPwd = await bcrypt.hash('Livreur@1234', 10);

  const admin = await prisma.user.create({ data: { email: 'admin@delicedelice.com', password: adminPwd, firstName: 'Super', lastName: 'Admin', role: Role.ADMIN, city: 'Cotonou' } });
  await prisma.admin.create({ data: { userId: admin.id } });
  const clients = await Promise.all([
    prisma.user.create({ data: { email: 'client1@test.com', password: clientPwd, firstName: 'Jean', lastName: 'Koffi', role: Role.CLIENT, city: 'Cotonou' } }),
    prisma.user.create({ data: { email: 'client2@test.com', password: clientPwd, firstName: 'Marie', lastName: 'Hounsou', role: Role.CLIENT, city: 'Porto-Novo' } }),
    prisma.user.create({ data: { email: 'client3@test.com', password: clientPwd, firstName: 'Paul', lastName: 'Agbossou', role: Role.CLIENT, city: 'Parakou' } }),
  ]);
  await prisma.client.createMany({ data: clients.map((u) => ({ userId: u.id })) });

  const owners = await Promise.all([
    prisma.user.create({ data: { email: 'resto1@test.com', password: restoPwd, firstName: 'Resto', lastName: 'One', role: Role.ESTABLISHMENT, city: 'Cotonou' } }),
    prisma.user.create({ data: { email: 'resto2@test.com', password: restoPwd, firstName: 'Hotel', lastName: 'Owner', role: Role.ESTABLISHMENT, city: 'Cotonou' } }),
    prisma.user.create({ data: { email: 'bakery1@test.com', password: bakeryPwd, firstName: 'Bakery', lastName: 'Owner', role: Role.ESTABLISHMENT, city: 'Porto-Novo' } }),
  ]);

  const agentsUsers = await Promise.all([
    prisma.user.create({ data: { email: 'livreur1@test.com', password: livreurPwd, firstName: 'Kossi', lastName: 'Mensah', role: Role.DELIVERY_AGENT, city: 'Cotonou' } }),
    prisma.user.create({ data: { email: 'livreur2@test.com', password: livreurPwd, firstName: 'Adjovi', lastName: 'Sénou', role: Role.DELIVERY_AGENT, city: 'Porto-Novo' } }),
  ]);

  await prisma.deliveryAgent.createMany({ data: agentsUsers.map((u) => ({ userId: u.id, isValidated: true, isAvailable: true })) });
  await prisma.loyaltyCard.createMany({ data: clients.map((u, i) => ({ userId: u.id, pointsBalance: (i + 1) * 100 })) });
  await prisma.referralCode.createMany({ data: clients.map((u, i) => ({ userId: u.id, code: `DELICE${i + 1}` })) });

  await prisma.deliveryZone.createMany({ data: [
    { name: 'Cotonou Centre', city: 'Cotonou', polygonGeoJson: { type: 'Polygon', coordinates: [[[2.41, 6.35], [2.44, 6.35], [2.44, 6.38], [2.41, 6.38], [2.41, 6.35]]] }, deliveryFee: 1000 },
    { name: 'Porto-Novo Centre', city: 'Porto-Novo', polygonGeoJson: { type: 'Polygon', coordinates: [[[2.60, 6.48], [2.64, 6.48], [2.64, 6.51], [2.60, 6.51], [2.60, 6.48]]] }, deliveryFee: 1200 },
  ] });

  console.log(`✅ Seeding completed by ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
