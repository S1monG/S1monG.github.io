// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Welcome to no mans land, dont touch if its working!!!
import {FC, ReactElement, useRef, useEffect } from 'react'
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
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id).distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.weight))

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
      .text((d) => d.id)

    const weightText = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('dy', -5)
      .attr('text-anchor', 'middle')
      .text((d) => d.weight)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      text.attr('x', (d) => d.x).attr('y', (d) => d.y)

      weightText
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2)
    })
  }, [graph])

  return <svg ref={svgRef} width={500} height={500}></svg>
}

export default D3Graph