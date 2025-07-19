export interface TreeNode {
  id: number;
  title: string;
  is_deleted: boolean;
  children: TreeNode[];
  deleted_at?: string | null;
}  