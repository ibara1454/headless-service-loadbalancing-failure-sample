# Headless service loadbalancing failure sample

This example shows that why you shouldn't use headless services in most cases.

## Prerequisite

- `skaffold`: v1.38.0+

## Demonstration

Run the following command to deploy pods and a normal ClusterIP `node` and a headeless service `node-hs` to your Kubernetes cluster:
```bash
skaffold dev
```

Next, create a new pod and send requests to `node-hs` from it every second:
```bash
kubectl run -it --rm --restart=Never just-a-pod --image=nginx:alpine -- \
  "while true; do curl http://node-hs:3000 ; sleep 1 ; done;"
```

Open the manifest `k8s/deployment.yaml` by your editor and modify the property `replicas` to `1` to downscale pods.

After this change, you would see the requests start to fail.

## Reasons

When we use the normal ClusterIP, the service proxies to forward inbound traffic to our pods.
While headless service relies on round-robin name resolution.

## Workflow

* Make some changes to `index.js`:
    * The file will be synchronized to the cluster
    * `nodemon` will restart the application
* Make some changes to `package.json`:
    * The full build/push/deploy process will be triggered, fetching dependencies from `npm`

## Skaffold Example: Node.js with hot-reload

Copied from: https://github.com/GoogleContainerTools/skaffold/tree/main/examples/nodejs
