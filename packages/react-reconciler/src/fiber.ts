import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { NoFlags, Flags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: any;
	type: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: Ref;
	pendingProps: Props;
	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	deletions: Array<FiberNode> | null;
	subtreeFlags: Flags;
	updateQueue: unknown;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.ref = null;
		this.stateNode = null;
		this.type = null;

		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.memoizedState = null;

		this.alternate = null;
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.deletions = null; // 指向待删除的子节点，用于在协调过程中进行删除
		this.updateQueue = null;
	}
}

// packages/react-reconciler/src/fiber.ts
export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		// 将根节点的 stateNode 属性指向 FiberRootNode，用于表示整个 React 应用的根节点
		hostRootFiber.stateNode = this;
		// 指向更新完成之后的 hostRootFiber
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let workInProgress = current.alternate;
	if (workInProgress == null) {
		// 首屏渲染时（mount）
		workInProgress = new FiberNode(current.tag, pendingProps, current.key);
		workInProgress.stateNode = current.stateNode;

		// 双缓冲机制
		workInProgress.alternate = current;
		current.alternate = workInProgress;
	} else {
		// 非首屏渲染时（update）
		workInProgress.pendingProps = pendingProps;
		// 将 effect 链表重置为空，以便在更新过程中记录新的副作用
		workInProgress.flags = NoFlags;
		workInProgress.subtreeFlags = NoFlags;
	}
	// 复制当前节点的大部分属性
	workInProgress.type = current.type;
	workInProgress.updateQueue = current.updateQueue;
	workInProgress.child = current.child;
	workInProgress.memoizedProps = current.memoizedProps;
	workInProgress.memoizedState = current.memoizedState;

	return workInProgress;
};

// 根据 DOM 节点创建新的 Fiber 节点
export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type == 'string') {
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的 type 类型', element);
	}

	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}
