import { ref, onMounted, onUnmounted } from 'vue'
import { Graph } from '@antv/x6'
import { MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW } from '@/utils/constants'

// If you change the value here,
// also change the relevant scss variable in the src/views/overview/Index.vue file
const BLOCK_DISTANCE = 24
const ARROW_DISTANCE = 16
const CIRCLE_RADIUS = 8

export default () => {
  const upEdgeContentEl = ref()
  const downEdgeContentEl = ref()

  /**
   * the autoResize config of antv has problem
   * so set svg width manually
   */
  const edgeCanvasWrapEl = ref()

  let upGraph: any = null
  let downGraph: any = null

  let canvasWidth = 1000
  let canvasHeight = 60
  let cardItemWidth = 0
  let northListLength = 0
  let southListLength = 0

  let resizeTimer: undefined | number = undefined

  const countXCoordinateArr = (total: number) => {
    const ret = []
    for (let i = 0; i < total; i += 1) {
      ret.push(countXCoordinate(total, i))
    }
    return ret
  }

  const countXCoordinate = (total: number, index: number) => {
    const centerIndex = (total - 1) / 2
    return {
      start: canvasWidth / 2 - (centerIndex - index) * (cardItemWidth + BLOCK_DISTANCE),
      end: canvasWidth / 2 - (centerIndex - index) * ARROW_DISTANCE,
    }
  }
  const countEdgeData = (XCoordinate: { start: number; end: number }, type: 'up' | 'down') => {
    const startY = type === 'up' ? CIRCLE_RADIUS : canvasHeight - CIRCLE_RADIUS
    const endY = type === 'up' ? canvasHeight : 0
    const routerY = type === 'up' ? canvasHeight - 35 : 35
    return {
      source: { x: XCoordinate.start, y: startY },
      target: { x: XCoordinate.end, y: endY },
      vertices: [{ x: XCoordinate.start, y: routerY }],
      router: { name: 'manhattan' },
      connector: { name: 'rounded' },
      panning: false,
      attrs: {
        line: {
          stroke: '#B3BEC4',
          targetMarker: 'classic',
          sourceMarker: {
            tagName: 'circle',
            r: CIRCLE_RADIUS / 2,
            cx: -CIRCLE_RADIUS / 2,
            fill: 'rgba(255,255,255,0)',
          },
        },
      },
    }
  }

  const drawUpEdge = () => {
    const edgeData = countXCoordinateArr(northListLength).map((XCoordinate: { start: number; end: number }) =>
      countEdgeData(XCoordinate, 'up'),
    )
    edgeData.forEach((edgeData) => {
      upGraph.addEdge(edgeData)
    })
  }

  const drawDownEdge = () => {
    const edgeData = countXCoordinateArr(southListLength).map((XCoordinate: { start: number; end: number }) =>
      countEdgeData(XCoordinate, 'down'),
    )
    edgeData.forEach((edgeData) => {
      downGraph.addEdge(edgeData)
    })
  }

  const draw = (northDriverListLength: number, southDriverListLength: number) => {
    canvasWidth = upEdgeContentEl.value.offsetWidth
    canvasHeight = upEdgeContentEl.value.offsetHeight
    cardItemWidth = Number(((canvasWidth - 2 * BLOCK_DISTANCE) / MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW).toFixed(2))
    northListLength =
      northDriverListLength > MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW
        ? MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW
        : northDriverListLength
    southListLength =
      southDriverListLength > MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW
        ? MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW
        : southDriverListLength

    drawUpEdge()
    drawDownEdge()
  }

  const resizeWatcher = async () => {
    if (resizeTimer) {
      return
    }
    resizeTimer = window.setTimeout(async () => {
      resizeTimer = undefined
    }, 300)

    const currentWidth = edgeCanvasWrapEl.value.offsetWidth
    upGraph.resize(currentWidth)
    downGraph.resize(currentWidth)

    upGraph.clearCells()
    downGraph.clearCells()

    draw(northListLength, southListLength)
  }

  onMounted(() => {
    upGraph = new Graph({
      container: upEdgeContentEl.value,
      interacting: { edgeMovable: false },
    })
    downGraph = new Graph({
      container: downEdgeContentEl.value,
      interacting: { edgeMovable: false },
    })
    downGraph.on('drag', (event: any) => {
      event.preventEvent()
    })
    window.addEventListener('resize', resizeWatcher)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeWatcher)
  })

  return {
    upEdgeContentEl,
    downEdgeContentEl,
    edgeCanvasWrapEl,
    draw,
  }
}
