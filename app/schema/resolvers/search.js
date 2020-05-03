import SearchControll from '../../controllers/search';

const resSearch = {
  Query: {
    search(parent, args, context, info){
      return SearchControll(args);
    } 
  }
};

export default resSearch;
