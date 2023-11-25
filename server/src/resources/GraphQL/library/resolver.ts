import LibraryService from "./service";

const libraryResolvers = {
  Query: {
    getLibraries: async () => {
      const libraries = await LibraryService.getLibraries({
        user_id: "6562153302dac173a0410655",
      });
      return libraries;
    },
  },
  Mutation: {
    modifyLibrary: async (
      _: any,
      {
        modifyLibraryInput: { name, description },
      }: { modifyLibraryInput: { name?: string; description?: string } }
    ) => {
      try {
        const query = {
          user_id: "6562153302dac173a0410655",
          _id: "6562153302dac173a0410659",
        };
        const libraryToUpdate = await LibraryService.getLibrary(query);
        await LibraryService.findAndUpdate(query, {
          name: name ?? libraryToUpdate?.name,
          description: description ?? libraryToUpdate?.description,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default libraryResolvers;
