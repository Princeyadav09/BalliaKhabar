import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {


    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'sports'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalizeFirstLetter = (str)=> {

        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    
        return capitalized;
    }
   
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page: 1, 
            totalResults: 0  
        }
        document.title = `BalliaKhabar - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    
    async updateNews(){
        //  this.props.setProgress(100);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fd51a55c2ca4d1d8e1da83ae9dcc10b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        // this.props.setProgress(30);
        let parsedData = await data.json();
        // this.props.setProgress(60);
        this.setState({
            articles: parsedData.articles,
            totalArticles:parsedData.totalResults,
            loading:false
        })
        // this.props.setProgress(100);
    }

    async componentDidMount(){
       // this.props.setProgress(10);
       this.updateNews(); 
    //   this.props.setProgress(100);
    }

    handleNextClick= async ()=>{

        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9ca544d18d442118968edb302959763&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page+1,
        //     articles: parsedData.articles,
        //     loading:false
        // }) 
        this.setState({
            page: this.state.page+1,
        })
        this.updateNews();
    }
    handlePrevClick= async ()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9ca544d18d442118968edb302959763&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        this.setState({
            page: this.state.page-1,
        })
        this.updateNews();
    }


    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fd51a55c2ca4d1d8e1da83ae9dcc10b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles:parsedData.totalResults,
            loading:false
        })
      };


  render() {
    return (
      <>
       <h2 className="text-center">BalliaKhabar - {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h2>
      { this.state.loading && <Spinner></Spinner>}

      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >

        <div className="container">
         <div className="row">
               {this.state.articles.map((element)=>{
                                 return  <div className="col-md-4"  key={element.url}>
                                <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
                                </div>   
                    })}            
         </div>
         </div>
         </InfiniteScroll>

{/* ÷ Previous Next Button */}
         {/* <div className ="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>	&larr; previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

         </div> */}
      
      </>
    )
  }
}

export default News
