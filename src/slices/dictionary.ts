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
      loading: boolean | 'reload';
      categories: CategoryType[] | null;
  },
  item: {
    loading: boolean;
    category: CategoryType | null;
  }
}

const initialState: DictionaryType = {
  list: {
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
    get_dictionary_request(dictionary) {
      dictionary.list.loading = true
    },
    get_dictionary_success(dictionary, action) {
      const { categories } = action.payload
      dictionary.list.categories = categories
      dictionary.list.loading = false
    },
    get_dictionary_error(dictionary) {
      dictionary.list.loading = 'reload'
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

// INFO DICTIONARY INSIDE
export const createDictionary = () => async (dispatch: AppDispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/dictionary`) // const dictionary = response.data
    dispatch(slice.actions.get_dictionary_success({ categories: [] }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// INFO DICTIONARY INSIDE
export const getDictionary = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary`)
    const { categories } = response.data.data
    dispatch(slice.actions.get_dictionary_success({ categories }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// INFO CATEGORY INSIDE
export const getCategory = ({ categoryId }: {categoryId: categoryIdType}) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary/${categoryId}`)
    console.log('CATEGORYID', categoryId)
    const category = response.data.data
    dispatch(slice.actions.get_category_success({ category }))
  } catch (error) {
    dispatch(slice.actions.get_category_error())
  }
}

// INFO DICTIONARY OUTSIDE
export const createDictionaryRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.get_dictionary_request())
  dispatch(createDictionary())
}

// INFO DICTIONARY OUTSIDE
export const getDictionaryRequest = () => async (dispatch: AppDispatch) => {
  console.log()
  dispatch(slice.actions.get_dictionary_request())
  dispatch(getDictionary())
}

// INFO CATEGORY OUTSIDE
export const getCategoryRequest = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.get_category_request())
  dispatch(getCategory({ categoryId }))
}

export const { reducer } = slice
export default slice
