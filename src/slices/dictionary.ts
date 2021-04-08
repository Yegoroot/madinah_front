/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import { AppDispatch } from 'src/store/index'

type categoryIdType = string

export type WordType = {
  title?: string,
  content?: string,
  category: string
}

export type CategoryType = {
  _id: categoryIdType,
  title: string,
  words: WordType[],
}

type CategoriesType = {
    loading: boolean | 'reload';
    categories: CategoryType[];
}

const initialState: CategoriesType = {
  loading: false,
  categories: []
}

const slice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    get_list_request(dictionary) {
      dictionary.loading = true
    },
    get_list_success(dictionary, action) {
      const { data } = action.payload
      dictionary.categories = data
      dictionary.loading = false
    },
    get_list_error(dictionary) {
      dictionary.loading = 'reload'
    },

    delete_item(dictionary, action) {
      const { categoryId }: {categoryId: categoryIdType} = action.payload
      dictionary.categories = dictionary.categories.filter((el) => el._id !== categoryId)
    }
  }
})

// OUTSIDE
export const deleteCategoryItem = (
  { categoryId }: {categoryId: categoryIdType}
) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/dictionary/${categoryId}`)
    dispatch(slice.actions.delete_item({ categoryId }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// INSIDE
export const getCategoryList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictionary`)
    const { data } = response.data
    console.log('DICTIONARIES FROM SERVER', response.data)
    dispatch(slice.actions.get_list_success({ data }))
  } catch (error) {
    dispatch(slice.actions.get_list_error())
  }
}

// OUTSIDE LISt
export const getCategoryListRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.get_list_request())
  dispatch(getCategoryList())
}

export const { reducer } = slice
export default slice
