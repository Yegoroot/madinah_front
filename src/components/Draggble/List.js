/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Paper,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'
import ShowRecord from 'src/components/Record/Item/ShowRecord'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.text.primary,
    '& img': {
      width: '100%',
      maxWidth: '100%',
    }
  },
  rootDragble: {
    background: theme.palette.primary.main,
  },

  paper: {
    background: theme.palette.background.dark,
    color: theme.palette.text.primary,
    padding: theme.spacing(3),
    marginBottom: 2,
    borderRadius: 0,
    lineBreak: 'anywhere'
  },
  paperDragble: {
    background: theme.palette.text.primary,
    color: theme.palette.background.dark,
  }
}))

const List = ({ contents, onDragble, type }) => {
  const classes = useStyles()
  const [items, setItems] = useState(contents)

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const itemsNew = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(itemsNew)
    onDragble(itemsNew)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx({
              [classes.root]: true,
              [classes.rootDragble]: snapshot.isDraggingOver,
            })}
          >
            {/* СОРТИРОВКА */}
            {items.map((item, index) => (
              <Draggable
                key={item._id}
                draggableId={item._id}
                index={index}
              >
                {/* eslint-disable-next-line no-shadow */ }
                {(provided, snapshot) => (

                  <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    elevation={3}
                    style={{ ...provided.draggableProps.style }}
                    className={clsx({
                      [classes.paper]: true,
                      [classes.paperDragble]: snapshot.isDragging,
                    })}
                  >

                    {type === 'topics' ? item.title : <ShowRecord content={item} /> }

                  </Paper>

                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
