import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../tree-node.model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() templateRef: any;
  @Output() nodeClick = new EventEmitter<TreeNode>();

  expandedNodes = signal<Set<number>>(new Set());

  trackById(index: number, node: TreeNode): number {
    return node.id;
  }

  toggleNode(node: TreeNode): void {
    if (node.children && node.children.length > 0) {
      const currentExpanded = this.expandedNodes();
      const newExpanded = new Set(currentExpanded);
      
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      
      this.expandedNodes.set(newExpanded);
    }
  }

  isExpanded(node: TreeNode): boolean {
    return this.expandedNodes().has(node.id);
  }

  hasChildren(node: TreeNode): boolean {
    return node.children && node.children.length > 0;
  }

  expandAll(node: TreeNode): void {
    const newExpanded = new Set(this.expandedNodes());
    
    const expandRecursive = (n: TreeNode) => {
      if (n.children && n.children.length > 0) {
        newExpanded.add(n.id);
        n.children.forEach(child => expandRecursive(child));
      }
    };
    
    expandRecursive(node);
    this.expandedNodes.set(newExpanded);
  }

  onNodeClick(node: TreeNode): void {
    this.nodeClick.emit(node);
  }
}