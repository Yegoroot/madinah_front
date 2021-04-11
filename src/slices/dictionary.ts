/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import { AppDispatch } from 'src/store/index'
import { enqueueSnackbar } from 'src/slices/alert'
import i18n from 'i18next'
// import wait from 'src/utils/wait' // await wait(4000)
// import ObjectID from 'bson-objectid'

type categoryIdType = string
type dictionaryIdType = string

export interface IWordType {
  _id?: string,
  title: string,
  content?: string,
  category: string
}

export interface ICategoryType {
  _id?: categoryIdType,
  dictionary: string,
  title: string,
  countWords?: number,
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

    // INFO DICTIONARY

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

    // INFO CATEGORY

    category_request(dictionary) {
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
    create_category_success(dictionary, action) {
      const { category } = action.payload
      dictionary.item.loading = false
      if (dictionary.list.categories) { dictionary.list.categories.push(category) }
    },
    delete_category_item(dictionary, action: {type: string, payload: categoryIdType}) {
      const categoryId = action.payload
      if (dictionary.list.categories) {
        dictionary.list.categories = dictionary.list.categories.filter((el) => el._id !== categoryId)
      }
    },

    // INFO WORD

    create_word_success(dictionary, action: {payload: IWordType}) {
      const word = action.payload
      const categoryId = word.category
      // DICREASE count of word in category was added word
      if (dictionary.list.categories) {
        dictionary.list.categories.map((cat) => {
          if (cat._id === categoryId && cat.countWords) {
            cat.countWords += 1
            return cat
          }
          return cat
        })
      }
    }
  }
})

// POST DICTIONARY INSIDE

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

// POST DICTIONARY OUTSIDE

export const createDictionaryRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.dictionary_request())
  dispatch(createDictionary())
}

// GET DICTIONARY INSIDE

export const getDictionary = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary`)
    const { data } = response.data

    dispatch(slice.actions.get_dictionary_success({ data }))
  } catch (error) {
    dispatch(slice.actions.get_dictionary_error())
  }
}

// GET DICTIONARY OUTSIDE

export const getDictionaryRequest = () => async (dispatch: AppDispatch) => {
  console.log()
  dispatch(slice.actions.dictionary_request())
  dispatch(getDictionary())
}

// POST CATEGORY INSIDE

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

// POST CATEGORY OUTSIDE

export const createCategoryRequest = (newCategory: ICategoryType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.category_request())
  dispatch(createCategory(newCategory))
}

// GET CATEGORY INSIDE

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

// GET CATEGORY OUTSIDE

export const getCategoryRequest = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.category_request())
  dispatch(getCategory({ categoryId }))
}

// DELETE CATEGORY OUTSIDE, INSIDE

export const deleteCategoryItem = (categoryId: categoryIdType) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/dictionary/cat/${categoryId}`)
    dispatch(slice.actions.delete_category_item(categoryId))
  } catch (error) {
    dispatch(enqueueSnackbar({
      message: i18n.t('notify.category has not been deleted'),
      variant: 'error'
    }))
  }
}

// POST WORD

export const createWord = (newWord: IWordType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dictionary/word`, newWord)
    console.log(response)
    const word: IWordType = response.data.data
    dispatch(slice.actions.create_word_success(word))
    dispatch(enqueueSnackbar({ message: i18n.t('notify.word has been added', { word: word.title }) }))
  } catch (error) {
    dispatch(enqueueSnackbar({
      message: i18n.t('notify.word has not been added', { word: newWord.title }),
      variant: 'error'
    }))
  }
}

export const { reducer } = slice
export default slice
