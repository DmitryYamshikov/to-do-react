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
            ]
        }
        this.deleteItem=this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant= this.onToggleImportant.bind(this);
        this.onToggleLiked=this.onToggleLiked.bind(this);
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
        /* changeStatus(id, 'like'); */
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const old = data[index];
            const newItem = {...old, like: !old.like}
            const newArr = [...data.slice(0,index), newItem, ...data.slice(index+1)]
            return { data: newArr}
        })
    }
/*     changeStatus (id, status) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = { ...old, status: !old.status }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return { data: newArr }
        })
    } */
    render() {
        return (
            <div className="app">
                <AppHeader 
                    counter={this.state.data.length}
                    liked = {this.state.data.filter(item=>item.like).length}
                />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <div>
                    <PostList
                        posts={this.state.data}
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

