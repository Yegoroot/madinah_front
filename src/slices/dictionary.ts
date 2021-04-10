/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import { AppDispatch } from 'src/store/index'
// import wait from 'src/utils/wait' // await wait(4000)
// import { enqueueSnackbar } from 'src/slices/alert'
// import ObjectID from 'bson-objectid'
// import i18n from 'i18next'

type categoryIdType = string
type dictionaryIdType = string

export interface IWordType {
  _id?: string,
  title: string,
  content?: string,
  category?: string
}

export interface ICategoryType {
  dictionary: string,
  _id?: categoryIdType,
  title: string,
  words: IWordType[],
}

type IDictionaryType = {
  list: {
      _id: dictionaryIdType | null;
      loading: boolean;
      categories: ICategoryType[] | null;
  },
  item: {
    loading: boolean;
    category: ICategoryType | null;
  }
}

const initialState: IDictionaryType = {
  list: {
    _id: null,
    loading: false,
    categories: null,
  },
  item: {
    loading: false,
    category: null
  }
}

const slice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    /**
     * INFO Dictionary
     */
    dictionary_request(dictionary) {
      dictionary.list.loading = true
    },
    // INFO GET AND CREATE
    get_dictionary_success(dictionary, action) {
      const { data } = action.payload
      dictionary.list.categories = data.categories
      dictionary.list._id = data._id
      dictionary.list.loading = false
    },
    get_dictionary_error(dictionary) {
      dictionary.list.loading = false
    },

    /**
     * INFO Category
     */

    category_request(dictionary) {
      console.log('REQUEST CATEGOTY')
      dictionary.item.loading = true
    },
    // INFO category get
    get_category_success(dictionary, action) {
      console.log('RESPONSE CATEGORY')
      const { category } = action.payload
      dictionary.item.category = category
      dictionary.item.loading = false
    },
    get_category_error(dictionary) {
      dictionary.item.loading = false
    },

    // INFO category create, update
    create_category_success(dictionary, action) {
      const { category } = action.payload
      dictionary.item.loading = false
      if (dictionary.list.categories) { dictionary.list.categories.push(category) }
    },

    // INFO category delete
    delete_category_item(dictionary, action: {type: string, payload: categoryIdType}) {
      const categoryId = action.payload
      if (dictionary.list.categories) {
        dictionary.list.categories = dictionary.list.categories.filter((el) => el._id !== categoryId)
      }
    }
  }
})

//  INFO OUTSIDE
export const deleteCategoryItem = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/dictionary/cat/${categoryId}`)
    dispatch(slice.actions.delete_category_item(categoryId))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// INFO CREATE DICTIONARY INSIDE
export const createDictionary = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dictionary`)
    const { data } = response.data
    console.log(response.data)
    dispatch(slice.actions.get_dictionary_success({ data }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// INFO GET DICTIONARY INSIDE
export const getDictionary = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary`)
    const { data } = response.data

    dispatch(slice.actions.get_dictionary_success({ data }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// INFO GET CATEGORY INSIDE
export const getCategory = ({ categoryId }: {categoryId: categoryIdType}) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary/cat/${categoryId}`)
    console.log('CATEGORYID', categoryId)
    const category = response.data.data
    dispatch(slice.actions.get_category_success({ category }))
  } catch (error) {
    dispatch(slice.actions.get_category_error())
  }
}
// INFO CREATE CATEGORY INSIDE
export const createCategory = (newCategory: ICategoryType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dictionary/cat`, newCategory)
    console.log(response)
    const category = response.data.data
    dispatch(slice.actions.create_category_success({ category }))
  } catch (error) {
    dispatch(slice.actions.get_category_error())
  }
}

// INFO CREATE DICTIONARY OUTSIDE
export const createDictionaryRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.dictionary_request())
  dispatch(createDictionary())
}

// INFO GET DICTIONARY OUTSIDE
export const getDictionaryRequest = () => async (dispatch: AppDispatch) => {
  console.log()
  dispatch(slice.actions.dictionary_request())
  dispatch(getDictionary())
}

// INFO CATEGORY OUTSIDE
export const getCategoryRequest = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.category_request())
  dispatch(getCategory({ categoryId }))
}

// INFO CATEGORY OUTSIDE
export const createCategoryRequest = (newCategory: ICategoryType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.category_request())
  dispatch(createCategory(newCategory))
}

export const { reducer } = slice
export default slice
