const useGenre = (selectedGenre) => {

    if(selectedGenre.length < 1) return "";
    
    const genreArr = selectedGenre.map((g) => g.id);
    return genreArr.reduce((acc,cur) => acc+ ','+cur);
}

export default useGenre
