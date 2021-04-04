export const paginationReducer =(state="",action) =>
{
    switch(action.type)

    {
      case 'SET_PAGINATION': return action.payload
    
      default : return state
    }
}