import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let {title,description, imageUrl,newsUrl,author,date,source}= this.props;
    return (
      <div className="my-3">
          <div className="card">
            <div className="badge" style = {
                {display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0'}
            }>
          <span className="badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source} </span>
          </div>
            <img src={imageUrl?imageUrl:"https://media.gettyimages.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=gi&k=20&c=G5uPfn2VTF3aXCr76pn1T7oWE-aHVQ0rAYMl_MK2OvM="} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
      </div>
    )
  }
}

export default NewsItem
