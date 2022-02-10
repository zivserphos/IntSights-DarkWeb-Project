const filterPastes = (inputState: string, allPastes: PasteI[]): PasteI[] => {
  if (inputState === "" || inputState.length < 2) return allPastes;
  const filtered = allPastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(inputState.toLowerCase()) ||
      paste.content.toLowerCase().includes(inputState.toLowerCase()) ||
      paste.category?.toLowerCase().includes(inputState.toLowerCase())
  );
  return filtered;
};

export default filterPastes;
