// eslint-disable-next-line
// @ts-nocheck
// Welcome to no mans land, dont touch if its working!!!
import {FC, ReactElement, useRef, useEffect, useContext } from 'react'
import { ColorModeContext } from '../../utils/ColorModeContext'
import * as d3 from 'd3'

export interface Graph {
  [node: string]: {
    [connectedNode: string]: number;
  };
}

interface D3GraphProps {
  graph: Graph;
}

const D3Graph: FC<D3GraphProps> = ({ graph }): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { themeMode } = useContext(ColorModeContext)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear previous content

    const width = 500
    const height = 500
    const radius = 20

    const nodes = Object.keys(graph).map((node) => ({ id: node }))
    const links = Object.entries(graph).flatMap(([source, targets]) =>
      Object.entries(targets).map(([target, weight]) => ({
        source,
        target,
        weight,
      }))
    )

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', radius)
      .attr('fill', 'lightblue')
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

    const text = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .text((d) => d.id)

    const weightText = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('dy', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', themeMode === 'light' ? 'black' : 'white')
      .text((d) => d.weight)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => Math.max(5, Math.min(width - 5, d.source.x)))
        .attr('y1', (d) => Math.max(5, Math.min(height - 5, d.source.y)))
        .attr('x2', (d) => Math.max(5, Math.min(width - 5, d.target.x)))
        .attr('y2', (d) => Math.max(5, Math.min(height - 5, d.target.y)))

      node
        .attr('cx', (d) => Math.max(5, Math.min(width - 5, d.x)))
        .attr('cy', (d) => Math.max(5, Math.min(height - 5, d.y)))

      text
        .attr('x', (d) => Math.max(5, Math.min(width - 5, d.x)))
        .attr('y', (d) => Math.max(5, Math.min(height - 5, d.y)))

      weightText
        .attr('x', (d) => Math.max(5, Math.min(width - 5, (d.source.x + d.target.x) / 2)))
        .attr('y', (d) => Math.max(5, Math.min(height - 5, (d.source.y + d.target.y) / 2)))
    })
  }, [graph, themeMode])

  return <svg ref={svgRef} width='100%' height='100%'></svg>
}

export default D3Graph