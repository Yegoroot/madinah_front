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

export type WordType = {
  _id?: string,
  title?: string,
  content?: string,
  category: string
}

export interface CategoryType {
  _id: categoryIdType,
  title: string,
  words: WordType[],
}

type DictionaryType = {
  list: {
      _id: dictionaryIdType | null;
      loading: boolean;
      categories: CategoryType[] | null;
  },
  item: {
    loading: boolean;
    category: CategoryType | null;
  }
}

const initialState: DictionaryType = {
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

    get_category_request(dictionary) {
      console.log('REQUEST CATEGOTY')
      dictionary.item.loading = true
    },
    get_category_success(dictionary, action) {
      console.log('RESPONSE CATEGORY')
      const { category } = action.payload
      dictionary.item.category = category
      dictionary.item.loading = false
    },
    get_category_error(dictionary) {
      dictionary.item.loading = false
    },

    // delete_item(dictionary, action) {
    //   const { categoryId }: {categoryId: categoryIdType} = action.payload
    //   dictionary.categories = dictionary.categories.filter((el) => el._id !== categoryId)
    // }
  }
})

// OUTSIDE
// export const deleteCategoryItem = (
//   { categoryId }: {categoryId: categoryIdType}
// ) => async (dispatch: AppDispatch) => {
//   try {
//     await axios.delete(`${API_BASE_URL}/dictionary/${categoryId}`)
//     dispatch(slice.actions.delete_item({ categoryId }))
//   } catch (error) {
//     console.error('error', error) // FIXME alert message
//   }
// }

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
    console.log(data)
    dispatch(slice.actions.get_dictionary_success({ data }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// INFO GET CATEGORY INSIDE
export const getCategory = ({ categoryId }: {categoryId: categoryIdType}) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary/${categoryId}`)
    console.log('CATEGORYID', categoryId)
    const { data } = response.data
    dispatch(slice.actions.get_category_success({ data }))
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
export const createCategoryRequest = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.get_category_request())
  dispatch(getCategory({ categoryId }))
}

// INFO CATEGORY OUTSIDE
export const getCategoryRequest = (dictionaryId: dictionaryIdType) => async (dispatch: AppDispatch) => {
  // dispatch(slice.actions.create_category_request())
  // dispatch(createCategory({ dictionaryIdType }))
}

export const { reducer } = slice
export default slice
