import * as mobx from 'mobx';
import { createContext, useContext } from 'react';
import * as api from './api';

export const ProjectContext = createContext<{ [key: string]: any }>({});

export const useProject = () => useContext(ProjectContext);

interface saveType{
  store: any;
  preview: any;
  id: any;
  authToken: any;
  name: any;
  isPrivate: any;
}
interface StoreType {
  toJSON(): any; 
  loadJSON:any
}

class Project {
  id = '';
  name = '';
  authToken = '';
  private = false;
  user = {};
  skipSaving = false;
  puterModalVisible = false;
  store: StoreType;
  saveTimeout:any;

  constructor({ store }:any) {
    mobx.makeAutoObservable(this);
    this.store = store;

    store.on('change', () => {
      this.requestSave();
    });
  }

  requestSave() {
    if (this.saveTimeout) {
      return;
    }
    this.saveTimeout = setTimeout(() => {
      this.saveTimeout = null;
      // skip autosave if no project opened
      this.save();
    }, 5000);
  }

  async loadById(id:any) {
    this.id = id;
    this.updateUrlWithProjectId();
    try {
      const { store, name } = await api.getDesignById({
        id,
        authToken: this.authToken,
      });
      if (store) {
        this.store.loadJSON(store);
      }
      this.name = name;
    } catch (e) {
      alert("Project can't be loaded");
    }
  }

  updateUrlWithProjectId() {
    if (!this.id || this.id === 'local') {
      window.history.replaceState({}, '', `/`);
      return;
    }
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('id', this.id);
    window.history.replaceState({}, '', `/design/${this.id}`);
  }

  async save() {
    const json = this.store.toJSON();
    const maxWidth = 400;
    const res = await api.saveDesign({
      store: json,
      // preview,
      id: this.id,
      isPrivate: this.private,
      name: this.name,
      authToken: this.authToken,
    } as saveType);
    if (res.status === 'saved') {
      this.id = res.id;
      this.updateUrlWithProjectId();
    }
  }

  async duplicate() {
    this.id = '';
    this.save();
  }

  // async clear() {
  //   await api.deleteDesign();
  // }
}

export const createProject = (options: { store: any }): Project => new Project(options);
export default createProject;
