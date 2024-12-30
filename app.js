const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function insertSelectedFieldsFromJSON(filePath) {
  try {
    // Lire le fichier JSON
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Insérer uniquement les champs nécessaires
    for (const item of data) {
      await prisma.product.create({
        data: {
          id: item.id, // Si l'id est fourni dans JSON, sinon retirez cette ligne
          title: item.title,
          description: item.description,
          category: item.category,
        },
      });
      console.log(`Inserted product: ${item.title}`);
    }
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Appeler la fonction avec le chemin du fichier JSON
insertSelectedFieldsFromJSON('./products.json');

