const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'admin@delice.local',
      firstName: 'Admin',
      lastName: 'Delice',
      role: 'ADMIN',
    },
    {
      email: 'manager@delice.local',
      firstName: 'Manager',
      lastName: 'Delice',
      role: 'MANAGER',
    },
    {
      email: 'client@delice.local',
      firstName: 'Client',
      lastName: 'Demo',
      role: 'USER',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      create: user,
    });
  }

  const count = await prisma.user.count();
  console.log(`✅ Seed terminé: ${count} utilisateur(s) dans la base.`);
}

main()
  .catch((error) => {
    console.error('❌ Erreur pendant le seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
