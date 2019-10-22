## CHANGE DATA SYNC
```
sheet                                  table                   dataproxy
------------------------------------------------------------------------------------

                                                               changeData(cb)

sync                                                            <---  v_splitSheets.forEach
sync                                                            <---  h_splitSheets.forEach
|
dataSync
 -->                                   render()
```

## SCROLL SPLIT WINDOW SYNC
```
sheet                                  table                   dataproxy
------------------------------------------------------------------------------------
### SELF SHEET UPDATE

scrollbarMove

 |

 horizontalScrollbarMove

  --->                                                     scrollx(x, cb)

                                      render()              <---cb 


### SPLIT SHEET UPDATE

                                                           scrollx(x,cb)

sync_movex(x)                                               <---cb

 |

 sync_horizontalScrollbarMove()

  --->                                                      sync_scrollx(x, cb)

                                      render()              <---cb

```
                                 
## SHAPE MOVE SPLIT WINDOW SYNC
```
sheet                                  table                   dataproxy
------------------------------------------------------------------------------------
### SELF SHEET UPDATE

                                  shape.on

                                   |

                                   move_layerd_Cell

                                   | |

                                   | move()

                                   render()
                                   -->                        changeData(cb)


```


