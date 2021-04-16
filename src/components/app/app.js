import React, { Component } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'Going to learn React', important: true, like:false, id: 1 },
                { label: 'Thats is so Good', important: false, like:false, id: 2 },
                { label: 'I need a break...', important: false, like:false, id: 3 }
            ],
            term:'',
            filter:'all',
        }
        this.deleteItem=this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant= this.onToggleImportant.bind(this);
        this.onToggleLiked=this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.filterPost = this.filterPost.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const before = data.slice(0,index);
            const after = data.slice(index+1);
            const newArr= [...before,...after];
            return {
                data:newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label:body,
            important:false,
            id:this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data,newItem];
            return {
                data:newArr
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const old = data[index];
            const newItem = {...old, important: !old.important}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];
            return { data:newArr }
        })
    }

    onToggleLiked(id) {
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const old = data[index];
            const newItem = {...old, like: !old.like}
            const newArr = [...data.slice(0,index), newItem, ...data.slice(index+1)]
            return { data: newArr}
        })
    }
    searchPost (items, term) {
        if (term.lenght===0) {
            return items
        }

        return items.filter((item)=>{
            return item.label.indexOf(term)>-1
        });

    }
    filterPost(items, filter) {
        if(filter==='like') {
            return items.filter(item=>item.like);
        } else {
            return items
        }
    }
    onFilterSelect(filter) {
        this.setState({filter});
    }
    onUpdateSearch(term){
        this.setState({term});
    }
    render() {

        const {data,term,filter} =this.state;
        const visiblePost = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader 
                    counter={this.state.data.length}
                    liked = {this.state.data.filter(item=>item.like).length}
                />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect = {this.onFilterSelect}
                    />
                </div>
                <div>
                    <PostList
                        posts={visiblePost}
                        onDelete={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleLiked={this.onToggleLiked}
                    />
                </div>
                <PostAddForm 
                    onAdd={this.addItem}
                />

            </div>
        )
    }
};



//! rafce

