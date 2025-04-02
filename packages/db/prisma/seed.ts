import prisma from "../src";
import { elements, elements2, maps, SampleAvatars } from "../src/SeedData";

(async () => {
  try {
    SampleAvatars.forEach(async (a) => {
      await prisma.avatar.create({
        data: {
          id: a.id,
          name: a.name,
          imageUrl: a.imageUrl,
        },
      });
    });
    maps.forEach(async (m) => {
      await prisma.map.create({
        data: {
          id: m.id,
          width: m.width,
          height: m.height,
          name: m.name,
          thumbnail: m.thumbnail,
        },
      });
    });

    elements.forEach(async (s) => {
      await prisma.element.create({
        data: {
          id: s.id,
          width: s.element.width,
          height: s.element.height,
          static: s.element.static,
          imageUrl: s.element.imageUrl,
        },
      });
    });

    elements2.forEach(async (s) => {
      await prisma.element.create({
        data: {
          id: s.id,
          width: s.element.width,
          height: s.element.height,
          static: s.element.static,
          imageUrl: s.element.imageUrl,
        },
      });
    });

    elements.forEach(async (s) => {
      await prisma.mapElements.create({
        data: {
          mapId: "map_1",
          elementId: s.id,
          x: s.x,
          y: s.y,
        },
      });
    });

    elements2.forEach(async (s) => {
      await prisma.mapElements.create({
        data: {
          mapId: "map_2",
          elementId: s.id,
          x: s.x,
          y: s.y,
        },
      });
    });
  } catch (e) {
    console.log("Error persisting data to the DB!");

  }
})();