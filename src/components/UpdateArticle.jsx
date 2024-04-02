const UpdateArticle = ({ title, price }) => {
  console.log(title, price);
  const changeArticleState = async (title, price) => {
    try {
      // Demande au backend de modifier un article
      const response = await axios.put("http://localhost:3000/offer/modify", {
        title: title,
        amount: price,
        status: "buyed",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return changeArticleState();
};
export default UpdateArticle;
