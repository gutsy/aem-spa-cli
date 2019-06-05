module.exports = {
    getContentXml(name, superType, componentGroup) {
        if (superType) {
            return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<jcr:root xmlns:sling=\"http://sling.apache.org/jcr/sling/1.0\" xmlns:cq=\"http://www.day.com/jcr/cq/1.0\" xmlns:jcr=\"http://www.jcp.org/jcr/1.0\"\n" +
                "      jcr:primaryType=\"cq:Component\"\n" +
                "      sling:resourceSuperType=\"" + superType + "\"\n" +
                "      jcr:title=\"" + name + "\"\n" +
                "      jcr:description=\" " + name + "Component\"\n" +
                "      cq:icon=\"textLeft\"\n" +
                "      componentGroup=\"" + componentGroup + "\"/>";
        } else {
            return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<jcr:root xmlns:sling=\"http://sling.apache.org/jcr/sling/1.0\" xmlns:cq=\"http://www.day.com/jcr/cq/1.0\" xmlns:jcr=\"http://www.jcp.org/jcr/1.0\"\n" +
                "      jcr:primaryType=\"cq:Component\"\n" +
                "      jcr:title=\"" + name + "\"\n" +
                "      jcr:description=\" " + name + "Component\"\n" +
                "      cq:icon=\"textLeft\"\n" +
                "      componentGroup=\"" + componentGroup + "\"/>";
        }
    }
};