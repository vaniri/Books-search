function getIdentifier(idents) {
    let isbn13 = idents.find(item => item.type === "ISBN_13");
    if (isbn13) {
        return isbn13.identifier;
    }
    return idents[0].identifier;
}

module.exports = { getIdentifier };